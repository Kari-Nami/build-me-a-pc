import { getCollection, setCollection } from './storage.js';
import {
  partCategories, parts, users, builderProfiles,
  builds, buildParts, ratings, comments, likes,
} from './seedData.js';

export function initializeSeedData() {
  // Only seed if data doesn't exist yet
  if (getCollection('part_categories').length > 0) return;

  setCollection('part_categories', partCategories);
  setCollection('parts', parts);
  setCollection('users', users);
  setCollection('builder_profiles', builderProfiles);
  setCollection('builds', builds);
  setCollection('build_parts', buildParts);
  setCollection('ratings', ratings);
  setCollection('comments', comments);
  setCollection('likes', likes);

  // Initialize empty collections
  setCollection('builder_apps', []);
  setCollection('build_requests', []);
  setCollection('builder_offers', []);
  setCollection('showcase_inquiries', []);

  console.log('BuildBoard: Seed data initialized');
}
