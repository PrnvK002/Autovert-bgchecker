export interface VersionState{
    loading:boolean;
    err:string;
    success:boolean;
    version:Version| any;
}

export interface Version{
    templateId:any;
    order:string[];
    fieldsId: any;
    createdAt?: any;
    updatedAt?: any;
    __v?: number;
}