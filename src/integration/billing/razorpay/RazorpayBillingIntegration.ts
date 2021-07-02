import { BillingDataTransactionStart, BillingDataTransactionStop, BillingDataTransactionUpdate, BillingInvoice, BillingInvoiceDocument, BillingInvoiceItem, BillingInvoiceStatus, BillingStatus, BillingTax, BillingUser } from '../../../types/Billing';
import { DocumentEncoding, DocumentType } from '../../../types/GlobalType';
import Stripe, { IResourceObject } from 'stripe';

import AxiosFactory from '../../../utils/AxiosFactory';
import { AxiosInstance } from 'axios';
import BackendError from '../../../exception/BackendError';
import BillingIntegration from '../BillingIntegration';
import BillingStorage from '../../../storage/mongodb/BillingStorage';
import Constants from '../../../utils/Constants';
import Cypher from '../../../utils/Cypher';
import I18nManager from '../../../utils/I18nManager';
import Logging from '../../../utils/Logging';
import { ServerAction } from '../../../types/Server';
import { RazorpayBillingSetting, StripeBillingSetting } from '../../../types/Setting';
import Transaction from '../../../types/Transaction';
import User from '../../../types/User';
import UserStorage from '../../../storage/mongodb/UserStorage';
import Utils from '../../../utils/Utils';

import moment from 'moment';

import ICustomerListOptions = Stripe.customers.ICustomerListOptions;
import ItaxRateSearchOptions = Stripe.taxRates.ItaxRateSearchOptions;
import IInvoice = Stripe.invoices.IInvoice;


const MODULE_NAME = 'RazorpayBillingIntegration';

export default class RazorpayBillingIntegration extends BillingIntegration<RazorpayBillingSetting> {
 
  
  private static readonly STRIPE_MAX_LIST = 100;
  private axiosInstance: AxiosInstance;
  private gateway: string;
  private paymentService: any;

  constructor(tenantId: string, settings: RazorpayBillingSetting) {
    super(tenantId, settings);
    this.axiosInstance = AxiosFactory.getAxiosInstance(this.tenantID);
   
    if (this.settings.secretKey) {
      this.settings.secretKey = Cypher.decrypt(settings.secretKey);
    }
    
   
  }
  checkConnection(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  
  getUsers(): Promise<BillingUser[]> {
    throw new Error('Method not implemented.');
  }

  public async getUser(id: string): Promise<BillingUser> {
    var axios = require('axios');
    var data = JSON.stringify({
      "custId": "cust_HUC2jNVJdR2iwG",
      "settings": {
        "key": "rzp_test_gtDsI6y6kcZjGm",
        "secret": "teo8UQPXb9x3hUnqizOImhtp",
        "gateway": "razorpay"
      }
    });
    
    var config = {
      method: 'get',
      url: 'http://localhost:8080/user',
      headers: { 
        'Authorization': 'Basic cnpwX3Rlc3RfZ3REc0k2eTZrY1pqR206dGVvOFVRUFhiOXgzaFVucWl6T0ltaHRw', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    let userData: BillingUser;
    axios(config)
    .then(function (response) {
      userData = response.data;
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    return userData;
  }
 


  getUpdatedUserIDsInBilling(): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  startTransaction(transaction: Transaction): Promise<BillingDataTransactionStart> {
    throw new Error('Method not implemented.');
  }
  updateTransaction(transaction: Transaction): Promise<BillingDataTransactionUpdate> {
    throw new Error('Method not implemented.');
  }
  stopTransaction(transaction: Transaction): Promise<BillingDataTransactionStop> {
    throw new Error('Method not implemented.');
  }
  checkIfUserCanBeCreated(user: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  checkIfUserCanBeUpdated(user: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  checkIfUserCanBeDeleted(user: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<BillingUser> {
    throw new Error('Method not implemented.');
  }
  createUser(user: User): Promise<BillingUser> {
    throw new Error('Method not implemented.');
  }
  updateUser(user: User): Promise<BillingUser> {
    throw new Error('Method not implemented.');
  }
  deleteUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  userExists(user: User): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getTaxes(): Promise<BillingTax[]> {
    throw new Error('Method not implemented.');
  }
  getInvoice(id: string): Promise<BillingInvoice> {
    throw new Error('Method not implemented.');
  }
  getUpdatedInvoiceIDsInBilling(billingUser?: BillingUser): Promise<string[]> {
    throw new Error('Method not implemented.');
  }
  createInvoiceItem(user: BillingUser, invoiceID: string, invoiceItem: BillingInvoiceItem, idempotencyKey?: string | number): Promise<BillingInvoiceItem> {
    throw new Error('Method not implemented.');
  }
  createInvoice(user: BillingUser, invoiceItem: BillingInvoiceItem, idempotencyKey?: string | number): Promise<{ invoice: BillingInvoice; invoiceItem: BillingInvoiceItem; }> {
    throw new Error('Method not implemented.');
  }
  downloadInvoiceDocument(invoice: BillingInvoice): Promise<BillingInvoiceDocument> {
    throw new Error('Method not implemented.');
  }
  finalizeInvoice(invoice: BillingInvoice): Promise<string> {
    throw new Error('Method not implemented.');
  }
 
  }
 