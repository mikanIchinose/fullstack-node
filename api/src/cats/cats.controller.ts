import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Redirect,
  HttpStatus,
  HttpException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cats.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return createCatDto;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.catsService.findByName(name);
  }

  @Get('name')
  findName(@Query('name') name: string): Array<string> {
    if (name === 'john') {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return this.catsService.findNames();
  }

  @Get('docs')
  @Redirect('/')
  getDocs(@Query('version') version: string) {
    if (version && version === '2') {
      return { url: 'https://docs.nestjs.com/controllers#request-object' };
    }
    return 'here is doc';
  }
}
