import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersearch',
  templateUrl: './orderSearch.component.html',
  styleUrls: ['./orderSearch.component.sass']
})

export class OrderSearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({});

  constructor(private router: Router){}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      orderNumber: new FormControl(null, {
        validators: [Validators.required]
      }),
    });
  }

  searchOrder(): void {
    this.router.navigate(['/OrderDetail/' + this.searchForm.value.orderNumber]);
  }
}
