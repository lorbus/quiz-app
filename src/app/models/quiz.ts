import { QuizConfig } from './quiz-config';
import { User } from './user';
import { Question } from './question';

export class Quiz {
    id: number;
    name: string;
    description: string;
    minPercToPass: number;
    config: QuizConfig;
    questions: Question[];
    user: User;

    constructor(data: any) {
        if (data) {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.minPercToPass = data.minPercToPass;
            this.config = new QuizConfig(data.config);
            this.questions = [];
            this.user = data.user;

            data.questions.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
