export class Answer {
    static shuffle(array) {
        let currentIndex = array.length,  randomIndex;
    
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
    
        // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }

    static getAnswers(q: any[]) {
        let outArr :any[] = []
        let answers : string[] = Answer.shuffle([ q["correct_answer"] ].concat(q["incorrect_answers"]))
        let i: number = 1
        outArr.push({
            id: i++,
            name: q["correct_answer"],
            isCorrect: true,
            isSelected: false
        })
        q["incorrect_answers"].forEach(x=>
            outArr.push({
                id: i++,
                name: x,
                isCorrect: false,
                isSelected: false
        }))
        return Answer.shuffle(outArr)
    }

    static checkSelections(q: any[]) : string[] {
        let outArr: string[] = []
        return outArr
    }
}
