import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OpenTriviaService {
  async getQuestions(difficulty: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUrl + "amount=10" + "&category=17" + "&difficulty=" + difficulty["name"]).toPromise().then((result: any) => {
        resolve(result.results);
        reject("Impossible les questions : vérifiez votre connexion internet.");
      });
    });
  }

  str: string = '';
  baseUrl: string = "https://opentdb.com/api.php?";

  constructor(private http: HttpClient) {}
}
