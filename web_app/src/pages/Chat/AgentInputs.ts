class AgentInput {
    input: string | undefined;
    otherInputs: Map<string, string> | undefined;

    constructor(input: string | undefined, otherInputs: Map<string, string> | undefined) {
        this.input = input;
        this.otherInputs = otherInputs;
    }

    toMessageDispyString(): string {
        let res = ""
        res += this.input
        res = res.replaceAll("\n","  \n")
        if (this.otherInputs !== undefined && this.otherInputs.size > 0) {
            res += "\n\n##### 其他背景输入:\n\n     "
            res += JSON.stringify(Object.fromEntries(this.otherInputs))
        }
        console.log(res)
        return res
    }

    static parseMessageDispyString(str: string): AgentInput {
        let arr = str.split("\n\n##### 其他背景输入:\n\n     ")
        let input = arr[0].replaceAll("  \n","\n")
        let otherInputs = new Map()
        if (arr.length >= 2) {
            let data = JSON.parse(arr[1])
            if (data !== null) {
                for (let key in data) {
                    otherInputs.set(key, data[key])
                }
            }

        }

        return new AgentInput(input, otherInputs)
    }
}

export default AgentInput;