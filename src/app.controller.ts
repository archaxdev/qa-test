import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { Country, CountryDTO, SortOrder } from './types';

@Controller('countries')
@ApiTags('countries')
@ApiBasicAuth()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Countries sorted by population' })
  @ApiQuery({ name: 'order', enum: SortOrder })
  @ApiOkResponse({
    type: [Country],
    description: 'List of Countries ordered as requested',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @Get()
  async getAllCountries(
    @Query('order') order: SortOrder = SortOrder.ASC,
  ): Promise<Country[]> {
    return this.appService.getCountries(order);
  }

  @ApiOperation({ summary: 'Reset list of countries to base data' })
  @ApiNoContentResponse({ description: 'Reset request accepted' })
  @Get('reset')
  @HttpCode(204)
  async resetCountryList() {
    return this.appService.resetCountries();
  }

  @ApiOperation({ summary: 'Delete country by country code' })
  @ApiNoContentResponse({ description: 'Deletion request accepted' })
  @ApiNotFoundResponse({ description: 'Country not found' })
  @Delete(':code')
  @HttpCode(204)
  async deleteCountry(@Param('code') code: string): Promise<void> {
    // Bonus points if you can provide information to the developers on how to "fix" this issue.
    throw new HttpException(
      `Unknown error whilst deleting. Cannot DELETE FROM Countrie WHERE code = '${code}'`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );

    // return this.appService.deleteCountry(code);
  }

  @ApiOperation({ summary: 'Update by country code' })
  @ApiAcceptedResponse({
    type: Country,
    status: 202,
    description: 'Update successful',
  })
  @ApiNotFoundResponse({ description: 'Country not found' })
  @HttpCode(202)
  @Patch(':code')
  async updateCountryAndPopulation(
    @Param('code') code: string,
    @Body() data: CountryDTO,
  ) {
    return this._updateCountry(code, data);
  }

  private _updateCountry(code: string, data: CountryDTO): Promise<Country> {
    return this.appService.updateCountry(code, data);
  }
}
