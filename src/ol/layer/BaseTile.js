/**
 * @module ol/layer/BaseTile
 */
import Layer from './Layer.js';
import TileProperty from './TileProperty.js';
import {assign} from '../obj.js';


/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {import("../source/Tile.js").default} [source] Source for this layer.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link module:ol/Map#addLayer}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 */


/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @api
 */
class BaseTileLayer extends Layer {
  /**
   * @param {Options=} opt_options Tile layer options.
   */
  constructor(opt_options) {
    const options = opt_options ? opt_options : {};

    const baseOptions = assign({}, options);

    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    super(baseOptions);

    this.setPreload(options.preload !== undefined ? options.preload : 0);
    this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ?
      options.useInterimTilesOnError : true);

  }

  /**
  * Return the level as number to which we will preload tiles up to.
  * @return {number} The level to preload tiles up to.
  * @observable
  * @api
  */
  getPreload() {
    return /** @type {number} */ (this.get(TileProperty.PRELOAD));
  }

  /**
  * Set the level as number to which we will preload tiles up to.
  * @param {number} preload The level to preload tiles up to.
  * @observable
  * @api
  */
  setPreload(preload) {
    this.set(TileProperty.PRELOAD, preload);
  }

  /**
  * Whether we use interim tiles on error.
  * @return {boolean} Use interim tiles on error.
  * @observable
  * @api
  */
  getUseInterimTilesOnError() {
    return /** @type {boolean} */ (this.get(TileProperty.USE_INTERIM_TILES_ON_ERROR));
  }

  /**
  * Set whether we use interim tiles on error.
  * @param {boolean} useInterimTilesOnError Use interim tiles on error.
  * @observable
  * @api
  */
  setUseInterimTilesOnError(useInterimTilesOnError) {
    this.set(TileProperty.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  }
}


/**
 * Return the associated {@link module:ol/source/Tile tilesource} of the layer.
 * @function
 * @return {import("../source/Tile.js").default} Source.
 * @api
 */
BaseTileLayer.prototype.getSource;


export default BaseTileLayer;
