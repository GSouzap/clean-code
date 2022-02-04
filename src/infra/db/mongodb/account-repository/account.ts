import { AddAccountRepository } from '../../../../data/protocols'
import { AccountModel } from '../../../../domain/models'
import { AddAccountModel } from '../../../../domain/usecases'
import { MongoHelper } from '../helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    const { _id, ...accountWithoutId } = account
    return Object.assign({}, accountWithoutId, { id: _id.toHexString() }) as AccountModel
  }
}
