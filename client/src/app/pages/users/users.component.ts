import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { ToastTypes } from '../../shared/enums/enum';
import { IUserApi, IUserView } from '../../shared/interfaces/user.interface';
import { ToastService } from '../../shared/services/toast.service';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { PenaltyModalComponent } from './penalty-modal/penalty-modal.component';
import { Users } from './state/users.actions';
import { UsersState } from './state/users.state';
import { getUsersForTable } from './users.mapper';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  public users: IUserApi[];
  public displayedColumns: string[] = [
    'name',
    'email',
    'address',
    'books',
    'penalty',
    'actions',
  ];
  public dataSource: MatTableDataSource<IUserView> = new MatTableDataSource(
    undefined
  );
  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Select(UsersState) users$: Observable<IUserApi[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly toastService: ToastService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.users$.pipe(untilDestroyed(this)).subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(getUsersForTable(users));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    this.getData();
  }

  public getPenaltyDueDate(date: string) {
    return new Date(date).getTime() - new Date().getTime() > 0 ? date : null;
  }

  public onAddUser(): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '600px',
    });

    this.afterModalClosed(dialogRef, 'The user has been successfully created.');
  }

  public onEditUser(userId: string): void {
    const user = this.users.find((x) => x._id === userId);
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '600px',
      data: {
        user,
      },
    });

    this.afterModalClosed(dialogRef, 'The user has been successfully updated.');
  }

  public onRemoveUser(userId: string): void {
    const user = this.users.find((x) => x._id === userId);
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        title: 'Delete User',
        text: 'Are you sure you want to delete the user?',
        id: user?._id,
        callBack: this.removeUser.bind(this),
      },
    });
  }

  public onUpdatePenalty(userId: string): void {
    const user = this.users.find((x) => x._id === userId);
    const dialogRef = this.dialog.open(PenaltyModalComponent, {
      width: '400px',
      data: {
        user,
      },
    });

    this.afterModalClosed(
      dialogRef,
      'The user penalty has been successfully updated.'
    );
  }

  private getData(): void {
    this.isLoading = true;
    this.store.dispatch(new Users.GetAll());
  }

  private removeUser(id: string): void {
    this.store
      .dispatch(new Users.Remove(id))
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.dialog.closeAll();
          this.toastService.open('The user has been successfully removed.');
          this.getData();
        },
        (err) => this.toastService.open(err.error.message, ToastTypes.Error)
      );
  }

  private afterModalClosed(
    dialogRef: MatDialogRef<any, any>,
    message: string
  ): void {
    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(
        (result) => {
          if (result) {
            this.getData();
            this.toastService.open(message);
          }
        },
        (err) => this.toastService.open(err.error.message, ToastTypes.Error)
      );
  }
}
