import { MissingParamError } from '../errors'
import { HttpRequest, HttpResponse } from '../protocols.http'
import { badRequest } from '../helpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
