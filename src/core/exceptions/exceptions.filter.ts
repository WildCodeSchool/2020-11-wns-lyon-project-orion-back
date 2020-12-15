import {Catch, ArgumentsHost, ExceptionFilter} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any {
        // console.log('Catching exception');
    }
}
