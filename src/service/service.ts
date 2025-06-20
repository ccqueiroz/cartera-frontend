export interface Service<InputDto, OutputDto> {
  execute(input: InputDto): OutputDto;
}
