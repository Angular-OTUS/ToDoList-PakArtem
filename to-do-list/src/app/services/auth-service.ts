import { inject, Service, signal } from '@angular/core';
import { Supabase } from './supabase';
import { User } from '@supabase/supabase-js';

@Service()
export class AuthService {
  private supabase = inject(Supabase);

  readonly user = signal<User | null>(null);

  readonly isAuthenticated = () => this.user() !== null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    const user = await this.supabase.getUser();

    this.user.set(user);

    this.supabase.authChanges((event, session) => {
      this.user.set(session?.user ?? null);
    });
  }

  async signUp(email: string, password: string) {
    return this.supabase.signUp(email, password);
  }

  signOut() {
    return this.supabase.signOut();
  }
}
