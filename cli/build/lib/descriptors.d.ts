export declare class AuthorDescriptor {
    name: string;
    email: string;
    url: string;
    github: string;
    constructor(params?: any);
}
export declare class ProjectDescriptor {
    name: string;
    slug: string;
    type: string;
    host: string;
    port: string;
    parent: ProjectDescriptor;
    path: string;
    childrenPath: string;
    token: string;
    year: number;
    constructor(params?: any);
    get sandbox(): any;
}
export declare class ProjectDescriptorSerializer {
    deflate(project: ProjectDescriptor): {};
}
