import UsersRepository from './usersRepository';
import ProductsRepository from './productsRepository';

const repositories = {
    users: UsersRepository,
    products: ProductsRepository,
};

export const RepositoryFactory = {
    get: name => repositories[name]
};