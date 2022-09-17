import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Answer } from '../answer';
import { OpenTriviaService } from '../open-trivia.service';
import { Question } from '../question';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  step: number = 0
  name: string = "";
  levelChoose: string = "";
  increment: number = 0
  doRemember: boolean = false
  score: number = 0
  questions: any[] = []
  question: any[]
  answers: any[] = []
  buttons: boolean[] = [ false , false ]
  levels = [
    {
      id: 1,
      name: 'easy'
    },
    {
      id: 2,
      name: 'medium'
    },
    {
      id: 3,
      name: 'hard'
    },
  ];

  constructor(private alertController: AlertController, private toastController: ToastController, private openTriviaSrv: OpenTriviaService) {}

  initQuestion() {
    this.answers = Answer.getAnswers(this.questions[this.increment])
    this.question =  Question.getQuestion( this.questions[this.increment])
  }

  async validateForm() {
    if( 3 < this.name.length && this.levelChoose != "" ) {
      this.step++
      await this.openTriviaSrv.getQuestions(this.levelChoose).then(
        (x:any) => {
          if ( 1 < x.length )
            this.questions = x
        }
      )
      this.initQuestion()
    } else {
      let errors: string[] = []
      if( this.name.length <= 3 )
        errors.push("nom de plus de 3 caractères")
      if( this.levelChoose == "" )
        errors.push("niveau de difficulté")
      this.presentAlert(errors)
    }
  }

  chooseAnswer(answerId:number) {
    if( ! this.answers.filter(x => x.id == answerId).map(x=>x.isSelected)[0] )
      this.presentToast(this.answers.filter(x => x.id == answerId).map(x=>x.name).toString())

    this.answers.filter(x => x.id != answerId).forEach( x => x.isSelected = false )
    this.answers.filter(x => x.id == answerId).forEach( x => x.isSelected = true )

    if( this.answers.filter(x => x.id == answerId).some( x => x.isSelected == true ) )
      this.buttons[0] = true
    else
      this.buttons[0] = false
  }

  validateThisQuestion() {
    this.buttons[0] = false
    this.buttons[1] = true
    if( this.answers.filter(x=>x.isSelected == true).map(x=>x.id)[0] == this.answers.filter(x=>x.isCorrect == true).map(x=>x.id)[0] )
      this.score++
  }

  next(idQ:number) {
    if( !this.answers.some( x => x.isSelected == true ) ) {
      this.presentAlert(["choisir une réponse"])
    } else {
      this.buttons[1] = false
      if( this.increment + 1 == this.questions.length ) {
        this.step++
      } else {
        this.increment++;
        this.initQuestion()
      }
    }
  }

  async presentAlert(errors: string[]) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      subHeader: 'Veuillez entrer un ...',
      message: errors.join('\n'),
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(no:string) {
    const toast = await this.toastController.create({
      message: 'Vous avez choisi la réponse '+no,
      duration: 500
    });

    await toast.present();
  };

  startAgain() {
    this.increment = 0
    this.step = 0
    this.score = 0
    this.name = "";
    this.levelChoose = "";
    this.doRemember = false
  }


}
