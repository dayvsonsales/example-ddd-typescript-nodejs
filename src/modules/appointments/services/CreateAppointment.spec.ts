import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const repository = new FakeAppointmentsRepository();

    const createAppointmentService = new CreateAppointmentService(repository);

    const date = new Date();
    const provider_id = '223334040';

    const appointment = await createAppointmentService.execute({
      date,
      provider_id,
    });

    expect(appointment).toHaveProperty('id');

    expect(await repository.find()).toHaveLength(1);
  });

  it('should raise an error when tries to create an appointment on a date that is already booked', async () => {
    const repository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(repository);

    const appointment = await createAppointmentService.execute({
      date: new Date('22/12/2020'),
      provider_id: '33333',
    });

    expect(appointment).toHaveProperty('id');

    expect(
      createAppointmentService.execute({
        date: new Date('22/12/2020'),
        provider_id: '33333',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(await repository.find()).toHaveLength(1);
  });
});
