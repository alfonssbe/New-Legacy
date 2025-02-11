"use client";

import * as z from "zod"
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/admin/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/admin/components/ui/card";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export default function Page () {

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.patch(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_USER_LOGIN}`, values);
      window.location.assign(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your username and password to login to admin page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Input your username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input disabled={loading} type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} type="submit" variant={'secondary'} className="w-full">Login</Button>
                  </div>
                </form>
              </Form> 
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
  );
};

