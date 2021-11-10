import { Component, Input, OnInit, OnChanges } from '@angular/core';
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
  ratings: Rating[] = [];
  selectedStarValue = 0;
  hasRated = false;

  @Input() itemId: string = "";

  constructor(private userService: UserService, private ratingService: RatingService) {}

  ngOnInit(): void {
    console.log(this.itemId);
    this.ratingForm = new FormGroup({
      comment: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  ngOnChanges() {
    if(this.itemId !== "") {
      this.ratingService.getRatingsByItemId(this.itemId).subscribe((data: any) => {
        console.log("ratingService.getRatingsByItemId", data);
        this.ratings = data.ratings;
        this.chechIfUserRated(data.ratings);
      });
    }
  }

  chechIfUserRated(ratings: Rating[]): void {
    // check all ratings for items, to check if current user has rated
    ratings.forEach(element => {
      if (element.userId === this.userService.getUserId) {
        this.hasRated = true;
        this.ratingForm.disable();
      }
    });
  }

  countStar(star: number): void {
    this.selectedStarValue = star;
  }

  createRating(): void {
    const newRating: Rating = {
      _id: '',
      itemId: this.itemId,
      userId: this.userService.getUserId,
      commentText: this.ratingForm.value.comment,
      rating: this.selectedStarValue
    };

    this.ratingService.createRating(newRating);
  }
}
