import { Model, View } from '../../../ts/model/src'
import { MediaType } from './types';

@Model export class Media {

    type: MediaType

    filename: string;

    path: string;

    title: string;

    description: string;

    tags: string[]

    duration: number;

    mime: string;

}

export interface Audio extends Media{ }
@View(Media) export class Audio {

    type: MediaType = 'audio'

}

export interface Image extends Media{ }
@View(Media) export class Image {

    type: MediaType = 'image'

}

export interface Video extends Media{ }
@View(Media) export class Video {

    type: MediaType = 'video'

}




/**
 * ON STARTUP, REINDEX:
 * Scan each of the folders
 *
 *    - Get copy of files existing in database
 *
 *    - Scan copy of files on disk
 *
 *    - Find files that were:
 *        - added
 *        - removed
 *
 *    - Determine files that moved by comparing added to removed
 *
 *    - Determine files that were restored comparing added to trash
 *
 *    - Update database record for files that moved, restored
 *
 *    - Update database record for files that were deleted
 *
 *    - Add database record for files that were added
 *
 */
