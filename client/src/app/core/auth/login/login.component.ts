import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ToastTypes } from 'src/app/shared/enums/enum';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-login',
    templateUrl: '../auth.component.html',
    styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly toastService: ToastService,
        private readonly location: Location
    ) {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                this.toastService.open('You have successfully registered.');
            } else if (params['accessDenied']) {
                this.toastService.open('Access is denied', ToastTypes.Error);
            } else if (params['sessionExpired']) {
                this.toastService.open('Please login again.');
            }
            this.location.replaceState('login');
        });
    }

    get f() {
        return this.form.controls;
    }

    get loginMethodButtonText(): string {
        return 'Register';
    }

    get submitButtonText(): string {
        return 'Sign In';
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.form.disable();
        this.authService.login(this.form.value)
            .pipe(untilDestroyed(this))
            .subscribe(token => {
                this.router.navigate(['/books']);
            }, err => {
                this.toastService.open(err.error.message, ToastTypes.Error);
                this.form.enable();
            });
    }

    public onLoginMethodClick(): void {
        this.router.navigate(['/register']);
    }
}
