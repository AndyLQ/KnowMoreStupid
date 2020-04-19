class Db {
    /**
     * Constructors an object for accessing kittens in the database
     * @param mongoose the mongoose object used to create schema objects for the database
     */
    constructor(mongoose) {
        // This is the schema we need to store kittens in MongoDB
        const questionSchema = new mongoose.Schema({
            title: String,
            desc: String,
            answers: [{
                text: String,
                votes: Number
            }]
        });

        // This model is used in the methods of this class to access kittens
        this.questionModel = mongoose.model('question', questionSchema);
    }

    async getQuestions() {
        try {
            return await this.questionModel.find({});
        } catch (error) {
            console.error("getQuestions:", error.message);
            return {};
        }
    }

    async getQuestion(id) {
        try {
            return await this.questionModel.findById(id);
        } catch (error) {
            console.error("getQuestion:", error.message);
            return {};
        }
    }

    async createQuestion(newQuestion) {
        // TODO: Error handling
        let question = new this.questionModel(newQuestion);
        return await question.save();
    }

    async createAnswer(id, newAnswer) {
        // TODO: Error handling same as the createQuestion function
        let answer = {
            text : newAnswer,
            votes: 0
        };

        const question = await this.getQuestion(id);
        question.answers.push(answer);
        return await question.save();
    }

    async vote() {

    }


    /**
     * This method adds a bunch of test data if the database is empty.
     * @param count The amount of kittens to add.
     * @returns {Promise} Resolves when everything has been saved.
     */
    async fillIfEmpty() {

        let l = (await this.getQuestions()).length;
        console.log("Question collection size:", l);

        if (l === 0) {
            console.log("Adding data because database was empty!")
            let promises = [];
            let question1 = new this.questionModel({
                title: "What is a horse?",
                desc: "I dont know what a horse is, my friend was talking about it the other day. What is it?",
                answers: []
            });

            promises.push(question1.save());

            let question2 = new this.questionModel({
                title: "How many legs does a goat have",
                desc: "Im trying to assemble my own goat, but i forgot how many legs a goat has. Help?!?",
                answers: []
            });

            promises.push(question2.save());

            let question3 = new this.questionModel({
                title: "How much wood?",
                desc: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
                answers: []
            });

            promises.push(question3.save());

            let question4 = new this.questionModel({
                title: "What is the price of calling 911 outside business hours?",
                desc: "I need help, but i am also poor. I want to call 911 but i want to be sure that its free",
                answers: []
            });

            promises.push(question4.save());

            let question5 = new this.questionModel({
                title: "How long should i boil my pizza",
                desc: "My friend told me to try boiling my pizza, but i dont know how long it should boil? Also how much water do i need?",
                answers: []
            });

            promises.push(question5.save());

            let question6 = new this.questionModel({
                title: "How do i defeat a stick?",
                desc: "The last boss of my D&D sessions is a regular stick, i am a level 19 Warrior half-orc, but everytime i attack it, it breaks and now there's 2!, Try again and now theres 4? - we have been at this game for 6 sessions already, Help!",
                answers: []
            });

            promises.push(question6.save());

            let question7 = new this.questionModel({
                title: "What is a dingo?",
                desc: "I dont know what a dingo is, please help",
                answers: [
                    {
                        id: 0,
                        text: "Its like a wild dog, from down-under",
                        votes: 12
                    },
                    {
                        id: 1,
                        text: "Its what dreams are made of",
                        votes: 2
                    },
                    {
                        id: 2,
                        text: "Its a game similar to 'bingo' but they have copyright so its basically a knockoff",
                        votes: -4
                    }
                ]
            });

            promises.push(question7.save());

            let question8 = new this.questionModel({
                title: "Can you kill a doctor with an apple?",
                desc: "I want to kill my doctor, before he kills me with all his tools and stuff",
                answers: [

                    {
                        id: 0,
                        text: "Yes if its a grenade apple aka. pomegranate",
                        votes: -5
                    },
                    {
                        id: 1,
                        text: "An apple is a fruit, very healthy, therefore it would just heal the doc",
                        votes: 7
                    },
                    {
                        id: 2,
                        text: "Theoretically the mass of a regular apple, thrown fast enough, would be able to damage a doctor to a lethal extend",
                        votes: 15
                    },
                    {
                        id: 3,
                        text: "An apple a day keeps the doctor away, it doesnt kill him stupid",
                        votes: 4
                    }
                ]
            });

            promises.push(question8.save());

            return Promise.all(promises);
        }

    }
}

// We export the object used to access the kittens in the database
module.exports = mongoose => new Db(mongoose);