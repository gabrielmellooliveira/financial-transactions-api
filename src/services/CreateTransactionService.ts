import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class CreateTransactionService {
    private transactionsRepository: TransactionsRepository;

    constructor(transactionsRepository: TransactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    public execute({ title, value, type }: RequestDTO): Transaction {
        if (type !== 'income' && type !== 'outcome') {
            throw Error('Invalid type of transaction');
        }

        const balance = this.transactionsRepository.getBalance();

        if (type === 'outcome' && value > balance.total) {
            throw Error('The outcome exceeded the total value');
        }

        return this.transactionsRepository.create({ title, value, type });
    }
}

export default CreateTransactionService;
