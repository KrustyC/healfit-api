import _ from 'lodash';
import moment from 'moment';
import mongoose from 'mongoose';
import { IObjectId } from '../../src/types/global';
import { IMealEvent } from '../../src/types/mealPlan';

import { MealEvent } from '../../src/context/mealplan/schema/MealEvent';

const { ObjectId: MongooseObjectId } = mongoose.mongo;

interface IMealEventData {
  _id?: IObjectId;
  date?: Date;
  endTime?: Date;
  recipes?: [string];
  owner: IObjectId;
  startTime?: Date;
  mealType?: string;
}

export function fakeMealEvent(data: IMealEventData): IMealEvent {
  return new MealEvent({
    _id: data._id ? new MongooseObjectId(data._id) : new MongooseObjectId(),
    date: data.date ? moment(data.date).unix() % 86400 : 17111.2222,
    endTime: data.endTime ? moment(data.endTime).unix() / 86400 : 25200,
    mealType: data.mealType || null,
    owner: data.owner,
    recipes: data.recipes || [],
    startTime: data.startTime ? moment(data.startTime).unix() / 86400 : 21600, // @TODO Here we should use current date
  });
}
