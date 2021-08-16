import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';

import {QuizService} from '../services/quiz.service';
import {Option, Question, Quiz, QuizConfig, User, Result} from '../models/index';
import {HelperService} from '../services/helper.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})

export class QuizComponent implements OnInit {

  constructor(
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private storage: LocalStorageService
  ) {
  }

  loginForm: FormGroup;
  errorMessage = '';
  showLogin = true;
  showSelectQuiz = false;
  logoutText = '';
  loginUserText = '';
  totalQestionsNumber = 0;
  totalCorretAnswers = 0;
  isShownPreviousResults = true;
  labelBtnResults = "Hide All Previous Results";
  isShownCurrentResult = false;
  labelBtnCurrentResult = "Show Results for ";
  user: User = new User(null);
  result: Result = new Result(null);
  quizzes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName = null;
  results: any[];

  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,      // if true, it will move to next question automatically when answered.
    'duration': 300,        // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,   // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';

  ngOnInit() {
    this.buildForm();
    this.quizzes = this.quizService.getAll();
    this.results = [];
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      mail: ['', [Validators.required, HelperService.emailValidator]],
      password: ['', [Validators.required, HelperService.passwordValidator]]
    });
  }

  inputChanged() {
    this.errorMessage = '';
  }

  submit({value, valid}: { value: User, valid: boolean }) {
    this.showLogin = false;
    this.showSelectQuiz = true;
    this.logoutText = 'Logout';
    this.loginUserText = value.mail;

    this.user.mail = value.mail.toLowerCase();
    this.user.password = value.password;
  }

  loadQuiz(quizName: string) {
    this.quizName = quizName;
    this.result = new Result(null);

    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.quiz.user = this.user;
      this.quiz.minPercToPass = 80;
      this.totalQestionsNumber = this.quiz.questions.length;

      this.pager.count = this.quiz.questions.length;
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => {
        this.tick();
      }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmitQuiz();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => {
        if (x.id !== option.id) {
          x.selected = false;
        }
      });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
  };

  onSubmitQuiz() {
    let answers = [];
    if (this.quizName != null) {
      this.quiz.questions.forEach(q => answers.push({
        'quizId': this.quiz.id,
        'questionId': q.id,
        'answered': q.answered
      }));
      this.mode = 'result';

      this.saveResults();
    }
  }

  closeQuizResult() {
    this.quizName = null;
    this.totalCorretAnswers = 0;
  }

  logoutApp() {
    this.logoutText = '';
    this.loginUserText = '';
    this.showLogin = true;
    this.showSelectQuiz = false;

    this.closeQuizResult();
    this.ngOnInit();
  }

  saveResults() {
    if(this.result!=null) {
      for (let q of this.quiz.questions) {
        if(this.isCorrect(q) == 'correct') {
          this.totalCorretAnswers++;
        }
      }

      this.result.correctAnswers = this.totalCorretAnswers;
      this.result.totalQuestions = this.totalQestionsNumber;
      this.result.dateQuiz = new Date();
      this.result.mail = this.quiz.user.mail;
      this.result.quizName = this.quiz.name;

      const percentageAchieved = (this.result.correctAnswers*100)/this.result.totalQuestions;
      this.result.percentageScore = percentageAchieved;
      this.result.passed = this.result.percentageScore>=this.quiz.minPercToPass;

      this.results.push(this.result);
    }
    this.result = null;
    //this.storage.store('results', this.results);
  }

  toggleResults() {
    this.isShownPreviousResults = !this.isShownPreviousResults;
    this.labelBtnResults = this.isShownPreviousResults ? "Hide All Previous Results" : "Show All Previous Results";
  }

  toggleCurrentResult() {
    this.isShownCurrentResult = !this.isShownCurrentResult;
    this.labelBtnCurrentResult = this.isShownCurrentResult ? "Hide Results for " : "Show Results for ";
  }

}
