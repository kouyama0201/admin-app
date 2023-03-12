import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {
  @Input() member: Member | any;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getMember();
  }

  getMember(): void {
    const id: number | any = this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(id)
      .subscribe(member => this.member = member);
  }

  goBack(): void {
    this.location.back();
  }
}
