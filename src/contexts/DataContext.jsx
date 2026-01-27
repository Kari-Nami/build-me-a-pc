import { createContext, useContext, useCallback } from 'react';
import {
  getCollection, addItem, updateItem, deleteItem,
  getById, query, getOne, setCollection,
} from '../utils/storage.js';
import { generateId } from '../utils/helpers.js';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // ─── Generic CRUD ─────────────────────────────────────────
  const getAll = useCallback((collection) => getCollection(collection), []);
  const getItemById = useCallback((collection, id) => getById(collection, id), []);
  const queryItems = useCallback((collection, predicate) => query(collection, predicate), []);
  const findOne = useCallback((collection, predicate) => getOne(collection, predicate), []);

  const createItem = useCallback((collection, data) => {
    const now = new Date().toISOString();
    const item = { id: generateId(), ...data, created_at: now, updated_at: now };
    return addItem(collection, item);
  }, []);

  const editItem = useCallback((collection, id, updates) => {
    return updateItem(collection, id, updates);
  }, []);

  const removeItem = useCallback((collection, id) => {
    return deleteItem(collection, id);
  }, []);

  // ─── Part Categories ──────────────────────────────────────
  const getCategories = useCallback(() => {
    return getCollection('part_categories').sort((a, b) => a.sort_order - b.sort_order);
  }, []);

  // ─── Parts ────────────────────────────────────────────────
  const getParts = useCallback((categoryId) => {
    const parts = getCollection('parts').filter(p => p.is_active);
    if (categoryId) return parts.filter(p => p.category_id === categoryId);
    return parts;
  }, []);

  const getAllParts = useCallback(() => getCollection('parts'), []);

  // ─── Builds ───────────────────────────────────────────────
  const getBuilds = useCallback((filters = {}) => {
    let builds = getCollection('builds');
    if (filters.status) builds = builds.filter(b => b.status === filters.status);
    if (filters.build_type) builds = builds.filter(b => b.build_type === filters.build_type);
    if (filters.user_id) builds = builds.filter(b => b.user_id === filters.user_id);
    return builds.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  const getBuildParts = useCallback((buildId) => {
    const buildParts = query('build_parts', bp => bp.build_id === buildId);
    const allParts = getCollection('parts');
    const categories = getCollection('part_categories');
    return buildParts.map(bp => {
      const part = allParts.find(p => p.id === bp.part_id);
      const category = part ? categories.find(c => c.id === part.category_id) : null;
      return { ...bp, part, category };
    });
  }, []);

  const saveBuild = useCallback((buildData, selectedParts) => {
    const now = new Date().toISOString();
    const isNew = !buildData.id;
    let build;

    if (isNew) {
      build = { id: generateId(), ...buildData, created_at: now, updated_at: now };
      addItem('builds', build);
    } else {
      build = updateItem('builds', buildData.id, buildData);
      // Remove old build_parts
      const existing = getCollection('build_parts').filter(bp => bp.build_id !== buildData.id);
      setCollection('build_parts', existing);
    }

    // Add new build_parts
    Object.entries(selectedParts).forEach(([, partId]) => {
      if (partId) {
        addItem('build_parts', {
          id: generateId(),
          build_id: build.id,
          part_id: partId,
          quantity: 1,
        });
      }
    });

    return build;
  }, []);

  // ─── Build Requests ───────────────────────────────────────
  const getRequests = useCallback((filters = {}) => {
    let requests = getCollection('build_requests');
    if (filters.status) requests = requests.filter(r => r.status === filters.status);
    if (filters.user_id) requests = requests.filter(r => r.user_id === filters.user_id);
    return requests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  // ─── Builder Offers ───────────────────────────────────────
  const getOffers = useCallback((filters = {}) => {
    let offers = getCollection('builder_offers');
    if (filters.request_id) offers = offers.filter(o => o.request_id === filters.request_id);
    if (filters.builder_id) offers = offers.filter(o => o.builder_id === filters.builder_id);
    return offers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  const acceptOffer = useCallback((offerId, requestId) => {
    // Accept this offer
    updateItem('builder_offers', offerId, { status: 'accepted' });
    // Reject all other offers for this request
    const otherOffers = query('builder_offers', o => o.request_id === requestId && o.id !== offerId);
    otherOffers.forEach(o => updateItem('builder_offers', o.id, { status: 'rejected' }));
    // Update request status
    updateItem('build_requests', requestId, { status: 'claimed' });
  }, []);

  // ─── Ratings ──────────────────────────────────────────────
  const getRatings = useCallback((buildId) => {
    return query('ratings', r => r.build_id === buildId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  const getUserRating = useCallback((userId, buildId) => {
    return getOne('ratings', r => r.user_id === userId && r.build_id === buildId);
  }, []);

  const addRating = useCallback((ratingData) => {
    const existing = getOne('ratings', r => r.user_id === ratingData.user_id && r.build_id === ratingData.build_id);
    if (existing) return null; // already rated

    const rating = createItem('ratings', ratingData);

    // Update build rating stats
    const allRatings = query('ratings', r => r.build_id === ratingData.build_id);
    const avg = allRatings.reduce((sum, r) => sum + r.score, 0) / allRatings.length;
    updateItem('builds', ratingData.build_id, {
      rating_avg: Math.round(avg * 100) / 100,
      rating_count: allRatings.length,
    });

    return rating;
  }, [createItem]);

  // ─── Comments ─────────────────────────────────────────────
  const getComments = useCallback((buildId) => {
    return query('comments', c => c.build_id === buildId)
      .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }, []);

  // ─── Likes ────────────────────────────────────────────────
  const getLikes = useCallback((buildId) => {
    return query('likes', l => l.build_id === buildId);
  }, []);

  const isLiked = useCallback((userId, buildId) => {
    return !!getOne('likes', l => l.user_id === userId && l.build_id === buildId);
  }, []);

  const toggleLike = useCallback((userId, buildId) => {
    const existing = getOne('likes', l => l.user_id === userId && l.build_id === buildId);
    if (existing) {
      deleteItem('likes', existing.id);
      const build = getById('builds', buildId);
      if (build) updateItem('builds', buildId, { like_count: Math.max(0, (build.like_count || 0) - 1) });
      return false;
    } else {
      addItem('likes', { id: generateId(), user_id: userId, build_id: buildId, created_at: new Date().toISOString() });
      const build = getById('builds', buildId);
      if (build) updateItem('builds', buildId, { like_count: (build.like_count || 0) + 1 });
      return true;
    }
  }, []);

  // ─── Builder Profiles ─────────────────────────────────────
  const getBuilderProfile = useCallback((userId) => {
    return getOne('builder_profiles', bp => bp.user_id === userId);
  }, []);

  // ─── Users ────────────────────────────────────────────────
  const getUser = useCallback((id) => getById('users', id), []);
  const getUsers = useCallback(() => getCollection('users'), []);

  // ─── Showcase Inquiries ───────────────────────────────────
  const getInquiries = useCallback((filters = {}) => {
    let items = getCollection('showcase_inquiries');
    if (filters.build_id) items = items.filter(i => i.build_id === filters.build_id);
    if (filters.builder_id) items = items.filter(i => i.builder_id === filters.builder_id);
    if (filters.user_id) items = items.filter(i => i.user_id === filters.user_id);
    return items.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  // ─── Builder Applications ─────────────────────────────────
  const getApplications = useCallback((filters = {}) => {
    let apps = getCollection('builder_apps');
    if (filters.status) apps = apps.filter(a => a.status === filters.status);
    if (filters.user_id) apps = apps.filter(a => a.user_id === filters.user_id);
    return apps.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, []);

  const value = {
    // Generic
    getAll, getItemById, queryItems, findOne, createItem, editItem, removeItem,
    // Categories & Parts
    getCategories, getParts, getAllParts,
    // Builds
    getBuilds, getBuildParts, saveBuild,
    // Requests & Offers
    getRequests, getOffers, acceptOffer,
    // Social
    getRatings, getUserRating, addRating,
    getComments,
    getLikes, isLiked, toggleLike,
    // Users & Builders
    getUser, getUsers, getBuilderProfile,
    // Inquiries & Applications
    getInquiries, getApplications,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
}
