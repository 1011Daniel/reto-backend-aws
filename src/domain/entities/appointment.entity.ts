export class Appointment {
  constructor(
    public readonly apt_id: string,
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public readonly countryISO: string,
    public readonly state:string
  ) {}
}