import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent {
  members$!: Observable<Member[] | any>;
  private searchTerms = new Subject<string>();

  constructor(private memberService: MemberService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      debounceTime(300), // キーボード入力の後、300ms待って次の実行に移る
      distinctUntilChanged(), // 直前のデータと同じ場合は処理を実行しない
      switchMap((term: string) => this.memberService.searchMembers(term)), // 検索キーワードを受け取る度に、新しいObservableを返す
    )
  }
}
