import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersUrl = 'api/members';

  constructor(
    private http: HttpClient,
    private MessageService: MessageService,
  ) { }

  getMembers(): Observable<Member[]> {
    this.MessageService.add('MemberService: 社員一覧データを取得しました');
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(members => this.log('社員データを取得しました')),
        catchError(this.handleError<Member[]>('getmembers', []))
      );
  }

  getMember(id: number): Observable<Member | any> {
    this.MessageService.add(`MemberService: 社員データ(id=${id})を取得しました`);
    return of(MEMBERS.find(member => member.id == id));
  }

  private log(message: string) {
    this.MessageService.add(`MemberService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} 失敗: ${error.message}`);

      return of(result as T);
    }
  }
}
