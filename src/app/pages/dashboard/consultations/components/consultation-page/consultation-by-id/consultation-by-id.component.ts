import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { ConsultationService } from "../../../services/consultation.service";
import { ConsultationByIDResponse, Reply } from "../../../interfaces/consultation-by-id.interface";
import Swal from "sweetalert2";
import { AuthService } from "../../../../../auth/services/auth.service";

@Component({
  selector: 'app-consultation-by-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './consultation-by-id.component.html',
  styleUrls: ['./consultation-by-id.component.css']
})
export default class ConsultationByIdComponent implements OnInit {
  consultation: ConsultationByIDResponse | null = null;
  replyForm: FormGroup = this.initForm();
  replyingTo: Reply | null = null;
  isReplying: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadConsultation(id);
    }
  }

  private initForm(): FormGroup {
    return this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  initiateNewReply() {
    this.isReplying = true;
    this.replyingTo = null;
    this.replyForm.reset();
  }

  loadConsultation(id: string) {
    this.consultationService.getConsultationById(id).subscribe({
      next: (data) => {
        this.consultation = data;
      },
      error: (error) => console.error('Error loading consultation:', error)
    });
  }

  submitReply() {
    if (this.replyForm.valid && this.consultation) {
      const replyContent = this.replyForm.get('content')?.value;
      this.consultationService.createReply(replyContent, this.consultation.id).subscribe({
        next: (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Respuesta enviada",
            showConfirmButton: false,
            timer: 1500
          });
          this.replyForm.reset();
          this.clearReplyingTo();
          this.loadConsultation(this.consultation!.id);
        },
        error: (error) => {
          console.error('Error submitting reply:', error);
          // Handle error (e.g., show error message to user)
        }
      });
    }
  }

  isAdminUser(): boolean {
    const currentUser = this.authService.currentUser();
    if (currentUser && typeof currentUser === 'object' && 'roles' in currentUser) {
      return (currentUser.roles as string[]).includes('admin');
    }
    return false;
  }

  canReply(reply: Reply): boolean {
    if (!this.isAdminUser()) return false;

    const lastReply = this.consultation!.replies[this.consultation!.replies.length - 1];

    // If the last reply is from admin, don't show any "Responder" buttons
    if (this.isAdminReply(lastReply)) return false;

    // For admin, show "Responder" button only for the last user reply
    return !this.isAdminReply(reply) && this.isLastReply(reply);
  }

  isLastReply(reply: Reply): boolean {
    return this.consultation!.replies[this.consultation!.replies.length - 1].id === reply.id;
  }

  isAdminReply(reply: Reply): boolean {
    return reply.user.roles.includes('admin');
  }

  setReplyingTo(reply: Reply) {
    this.isReplying = true;
    this.replyingTo = reply;
    this.replyForm.reset();
  }

  clearReplyingTo() {
    this.isReplying = false;
    this.replyingTo = null;
    this.replyForm.reset();
  }

  get contentControl() {
    return this.replyForm.get('content');
  }
}
