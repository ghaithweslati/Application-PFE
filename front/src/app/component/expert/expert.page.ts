import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Expert } from 'src/app/model/expert';
import { ExpertService } from 'src/app/service/expert.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.page.html',
  styleUrls: ['./expert.page.scss'],
})
export class ExpertPage implements OnInit {

  expert:Expert=new Expert();
  constructor(
    private expertService:ExpertService, 
    private _sanitizer: DomSanitizer,
    private router:Router,
    private route:ActivatedRoute,
    ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.expert.id=params.id;
        this.expertService.afficherExpert(this.expert.id).subscribe((res:any)=>
        {
          this.expert=res.data;
        });
      }
    });
  }


  base64image(photo)
  {
    if(photo)
      return this._sanitizer.bypassSecurityTrustResourceUrl(photo);
    else
      return "assets/icon/user.png"; 
  }


  afficherDetail(id:number)
  {

    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(['sujet-detail'],navigationExtras);
  }


}
