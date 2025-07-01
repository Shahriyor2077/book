import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)private readonly categoriesModel: typeof Categories
  ){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoriesModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoriesModel.findAll();
  }

  findOne(id: number) {
    return this.categoriesModel.findByPk(id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesModel.update(updateCategoryDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.categoriesModel.destroy({where: {id}});
  }
}
