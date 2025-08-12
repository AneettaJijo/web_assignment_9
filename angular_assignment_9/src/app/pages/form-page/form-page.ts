import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Feedback Form</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="feedback-form">

        <!-- Name -->
        <div class="form-group">
          <label>Name:</label>
          <input type="text" formControlName="name" />
          @if (form.get('name')?.invalid && form.get('name')?.touched) {
            <div class="error">
              @if (form.get('name')?.errors?.['required']) { Name is required. }
              @if (form.get('name')?.errors?.['minlength']) { Min 2 characters. }
            </div>
          }
        </div>

        <!-- Email -->
        <div class="form-group">
          <label>Email:</label>
          <input type="email" formControlName="email" />
          @if (form.get('email')?.invalid && form.get('email')?.touched) {
            <div class="error">
              @if (form.get('email')?.errors?.['required']) { Email is required. }
              @if (form.get('email')?.errors?.['email']) { Invalid email. }
            </div>
          }
        </div>

        <!-- Message -->
        <div class="form-group">
          <label>Message:</label>
          <textarea formControlName="message" rows="4"></textarea>
          @if (form.get('message')?.invalid && form.get('message')?.touched) {
            <div class="error">
              @if (form.get('message')?.errors?.['required']) { Message is required. }
              @if (form.get('message')?.errors?.['minlength']) { Min 10 characters. }
            </div>
          }
        </div>

        <button type="submit" [disabled]="form.invalid">Submit</button>
      </form>

      @if (submitted) {
        <div class="success">
          Thank you, {{ formData.name }}! We received your message.
        </div>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 2rem auto; padding: 1rem; }
    .form-group { margin: 1rem 0; }
    label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
    input, textarea { width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; }
    .error { color: red; font-size: 0.9em; margin-top: 0.3rem; }
    .success { margin-top: 1rem; padding: 1rem; background: #d4edda; color: #155724; border-radius: 4px; }
    button {
      background: #007bff; color: white; padding: 0.7rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;
    }
    button:disabled { background: #ccc; cursor: not-allowed; }
  `]
})
export class FormPageComponent {
  form!: FormGroup; 
  submitted = false;
  formData: any = {};

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.formData = this.form.value;
      alert('Form submitted successfully!');
      this.form.reset();
      setTimeout(() => (this.submitted = false), 5000);
    }
  }
}