import { AddAccountRepository } from '../../../../data/protocols'
import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/usecases'
import { MongoHelper } from '../helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }
}
