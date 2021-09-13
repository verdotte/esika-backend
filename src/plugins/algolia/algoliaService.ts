import { pick } from 'lodash';
import algoliaSearch from './algolia';
import { IAlgoliaIndex } from '../../interfaces/algoliaIndex.interface';

/**
 * Algolia Service
 */
export class AlgoliaService {
  /**
   * Create Index
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IAlgoliaIndex} obj
   * @returns {Promise<void>}
   * @memberof AlgoliaService
   */
  createIndex = async (
    obj: IAlgoliaIndex = {
      objectID: '',
      title: '',
      location: '',
      image: '',
      resource: '',
      description: '',
      price: '',
    },
  ): Promise<void> => {
    const index = pick(obj, [
      'objectID',
      'title',
      'location',
      'image',
      'resource',
      'description',
      'price',
    ]);

    if (obj.objectID) {
      await algoliaSearch.saveObjects([index]);
    }
  };

  /**
   * Update Index
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {IAlgoliaIndex} obj
   * @returns {Promise<void>}
   * @memberof AlgoliaService
   */
  updateIndex = async (
    obj: IAlgoliaIndex = {
      objectID: '',
      title: '',
      location: '',
      image: '',
      resource: '',
      description: '',
      price: '',
    },
  ): Promise<void> => {
    const index = pick(obj, [
      'objectID',
      'title',
      'location',
      'image',
      'resource',
      'description',
      'price',
    ]);

    if (obj.objectID) {
      await algoliaSearch.partialUpdateObject(index);
    }
  };

  /**
   * Delete Index
   * @author Verdotte Aututu
   * @since 0.001
   *
   * @param {string} objectID
   * @returns {Promise<void>}
   * @memberof AlgoliaService
   */
  deleteIndex = async (objectID: string): Promise<void> => {
    if (objectID) {
      await algoliaSearch.deleteObject(objectID);
    }
  };
}
