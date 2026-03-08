/* eslint-disable @typescript-eslint/no-explicit-any */

import {useDispatch, useSelector} from 'react-redux';
import {login} from '@/features/auth/authSlice';
import {useNavigate} from 'react-router-dom';

import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {loginSchema, type LoginFormValues} from '@/schemas/loginSchema';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

import {Field, FieldLabel, FieldError, FieldGroup} from '@/components/ui/field';
import {Loader2} from 'lucide-react';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state: any) => state.auth.error);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: LoginFormValues) {
    const result = await dispatch(login(values) as any);

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  }

  return (
    <div
      data-testid="login-page"
      className="flex min-h-screen items-center justify-center bg-background"
    >
      <Card className="w-87.5">
        <CardHeader>
          <CardTitle data-testid="login-title" className="text-center">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form data-testid="login-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* EMAIL */}

              <Controller
                name="email"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>

                    <Input
                      {...field}
                      data-testid="email-input"
                      placeholder="email@example.com"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        data-testid="email-error"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}

              <Controller
                name="password"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>

                    <Input
                      type="password"
                      {...field}
                      data-testid="password-input"
                      placeholder="******"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError
                        data-testid="password-error"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              data-testid="login-button"
              className="w-full mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2
                  data-testid="loading-spinner"
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}

              {form.formState.isSubmitting ? 'Signing in...' : 'Login'}
            </Button>

            {error && (
              <p
                data-testid="login-error"
                className="text-sm text-red-500 mt-2 text-center"
              >
                Invalid email or password
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
