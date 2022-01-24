import { IUserApi, IUserView } from '../../shared/interfaces/user.interface';

export function getUsersForTable(users: IUserApi[]): IUserView[] {
  const usersForTable = users.map((x) => ({
    name: `${x.lastName} ${x.name}`,
    address: x.address,
    books: x.books.map((x) => x.name).join(', '),
    penaltyDueDate: x.penaltyDueDate,
    id: x._id,
    email: x.email,
  }));

  return usersForTable;
}
