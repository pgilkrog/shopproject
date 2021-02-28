import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rating } from 'src/app/models/Rating';
import { RatingService } from 'src/app/services/rating.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.sass']
})

export class RatingComponent implements OnInit {
  ratingForm: FormGroup = new FormGroup({});
  stars: number[] = [5, 4, 3, 2, 1];
  selectedStarValue = 0;
  ratings: Rating[] = [];
  @Input() itemId = '';

  constructor(private userService: UserService, private ratingService: RatingService) {}

  ngOnInit(): void {
    console.log(this.itemId);
    this.ratingForm = new FormGroup({
      comment: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.ratingService.getOrdersByItemId(this.itemId).subscribe((data: any) => this.ratings = data.ratings);

  }

  countStar(star: number): void {
    this.selectedStarValue = star;
  }

  createRating(): void {
    const newRating: Rating = {
      _id: '',
      itemId: this.itemId,
      userId: this.userService.getUserId(),
      commentText: this.ratingForm.value.comment,
      rating: this.selectedStarValue
    };

    this.ratingService.createRating(newRating);
  }
}
