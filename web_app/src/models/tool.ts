import {DEFAULT_LOGO} from "@/constants";

class Tool {
    name?: string | undefined
    description?: string | undefined
    avatar? :string | undefined
    constructor(name:string,description:string) {
        this.avatar = DEFAULT_LOGO
        this.name = name
        this.description = description
    }
}

export default Tool