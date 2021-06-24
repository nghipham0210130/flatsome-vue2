import UsersRepository from './User/usersRepository';
import ProductsRepository from './User/productsRepository';
import UsersRepository_Admin from './Admin/usersRepository_Admin';
import ProductsRepository_Admin from './Admin/productsRepository_Admin';

const repositories = {
    users: UsersRepository,
    products: ProductsRepository,
    users_admin: UsersRepository_Admin,
    products_admin: ProductsRepository_Admin,
};

export const RepositoryFactory = {
    get: name => repositories[name],
};