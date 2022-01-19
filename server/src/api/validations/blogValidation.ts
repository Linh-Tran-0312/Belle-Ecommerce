 

export class ValidateBlogCateModel {
    /**
     * @pattern ^(?!\s*$).+ Blog category must not be empty
     */
    public name!: string;
/*     constructor(name: string) {
        this.name = name
    } */
}

export class ValidateBlogModel {
    /**
     * @pattern ^(?!\s*$).+ Blog title must not be empty
     */
    title: string;
    /**
     * @isInt Category id must be an integer
     * @minimum 0 Category id value must be at least 0
     */
    categoryId: number;
    imgPath?: string;
    content: string;
    commentAllow: boolean; 
    constructor(title: string, categoryId: number, imgPath: string, content: string, commentAllow: boolean) {
        this.title = title;
        this.categoryId = categoryId;
        this.imgPath = imgPath;
        this.content = content;
        this.commentAllow = commentAllow
    }

}