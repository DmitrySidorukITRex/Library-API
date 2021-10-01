import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastTypes } from 'src/app/shared/enums/enum';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../auth.service';

@UntilDestroy()
@Component({
    selector: 'app-register',
    templateUrl: '../auth.component.html',
    styleUrls: ['../auth.component.scss']
})
export class RegisterComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly toastService: ToastService
    ) {
        this.form = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            name: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
    }

    get f() {
        return this.form.controls;
    }

    get loginMethodButtonText(): string {
        return 'Login';
    }

    get submitButtonText(): string {
        return 'Sign Up';
    }

    public onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.authService.register(this.form.value)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.router.navigate(['/login'], { queryParams: { registered: true } });
            }, err => this.toastService.open(err.error.message, ToastTypes.Error));
    }

    public onLoginMethodClick(): void {
        this.router.navigate(['/login']);
    }
}
