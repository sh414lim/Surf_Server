import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  // value : 현재 파이프에 전달된 인수
  // metadat : 현재 파이프에 전달된 인수의 메타데이터
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    return value;
  }
}
