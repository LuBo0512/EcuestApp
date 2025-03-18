export interface ISurveyRepository {
  create(title: string, description?: string): Promise<any>;
  findAll(): Promise<any[]>;
  findById(id: string): Promise<any>;
  delete(id: string): Promise<void>;
}
