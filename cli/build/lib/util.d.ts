import { AuthorDescriptor, ProjectDescriptor } from './descriptors';
/**
 * Load the project file in the given directory. Will also load
 * all 'parent' projects by looking for project files further up
 * the directory tree until a 'sandbox' project is found.
 * @param dir The project directory to load
 */
export declare function load_project(dir?: string): ProjectDescriptor;
export declare function load_closest_project(dir?: string): ProjectDescriptor;
export declare function load_author_file(filepath: string): AuthorDescriptor;
