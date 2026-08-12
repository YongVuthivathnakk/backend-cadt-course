import { Duration } from "./Duration.js";
/**
 * This class handle a single race time for a given particicpant and sport type
 */
export class RaceResult {
/**
 * Participant ID
 * @type {string}
 * @private
 */
_id;

/**
 *  Sport type
 * @type {string}
 * @private
 */
_type;

/**
 *  Duration
 * @type {Duration}
 * @private
 */
_duration;

/** Constructor
 * Create new RaceResult
 * @param {string} id - Participant ID 
 * @param {string} type - Sport Type
 * @param {Duration} duration - Race duration
 */
constructor(id, type, duration) {
    this._id = id;
    this._type = type;
    this._duration = duration;
}
   get id() {return this._id;}
    get type() {return this._type}
    get duration () {return this._duration}
}