export class Result {
    mail: string;
    quizName: string;
    percentageScore: number;
    passed: boolean;
    correctAnswers: number;
    dateQuiz: Date;
    totalQuestions: number;

    constructor(data: any) {
        data = data || {};
        this.mail = data.mail;
        this.quizName = data.quizName;
        this.passed = data.passed;
        this.correctAnswers = data.correctAnswers;
        this.percentageScore = data.percentageScore;
        this.totalQuestions = data.totalQuestions;
        this.dateQuiz = data.dateQuiz;
    }
}
