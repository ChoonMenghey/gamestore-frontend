import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useBack, useList } from "@refinedev/core"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@refinedev/react-hook-form";
import { gameSchema } from "@/lib/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UploadWidget from "@/components/upload-widget";
import { GameDetails, User } from "@/types";
import { GENRES_OPTIONS, STATUS_OPTIONS } from "@/constants";
import { useGetIdentity } from "@refinedev/core";

const GamesCreate = () => {
  const { data: currentUser } = useGetIdentity<User>();

  const back = useBack();
  
  const form = useForm({
    resolver: zodResolver(gameSchema),
    refineCoreProps: {
      resource: 'games',
      action: 'create',
    },
  });

  const {
    refineCore: { onFinish },
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = form;

  const onSubmit = async (values: z.infer<typeof gameSchema>) => {
    if (!currentUser?.id) return;

    try {
      // inject the current user id if available; the server will also
      // derive developerId from the authenticated session so this is
      // mostly for schema compatibility and any client-side previews.
      await onFinish({
        ...values,
        developerId: currentUser?.id,
      });
    } catch (error) {
      console.log("Error creating game", error);
      // you could show a notification here if desired
    }
  }

  const { query: gamesQuery } = useList<GameDetails>({
    resource: 'games',
    pagination: {
      pageSize: 100
    }
  })

  const { query: developersQuery } = useList<User>({
    resource: 'users',
    filters: [
      { field: 'role', operator: 'eq', value: 'developer' },
    ],
    pagination: {
      pageSize: 100
    }
  })

  const bannerPublicId = form.watch("bannerCldPubId");

  const setBannerImage = (file: any, field: any) => {
    if (file) {
      field.onChange(file.url);
      form.setValue('bannerCldPubId', file.publicId, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      field.onChange('');
      form.setValue("bannerCldPubId", '', {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }
  return (
    <CreateView>
      <Breadcrumb />
      <h1 className="page-title">Create a Game</h1>
      <div className="intro-row">
        <p>Provide the required information to create a new game.</p>
        <Button onClick={back}>Back</Button>
      </div>

      <Separator />

      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold">
              Fill out the form
            </CardTitle>
          </CardHeader>
          <Separator />

          <CardContent className="mt-7">
            <Form {...form}>
              <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Banner Image
                        <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <UploadWidget
                          value={field.value ? { url: field.value, publicId: bannerPublicId ?? "" } : null}
                          onChange={(file: any) => setBannerImage(file, field)}
                        />
                      </FormControl>
                      <FormMessage />
                      {errors.bannerCldPubId && !errors.bannerUrl && (
                        <p className="text-destructive text-sm">
                          {errors.bannerCldPubId?.message?.toString()}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter game title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="genreId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))}
                            value={field?.value?.toString()}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {GENRES_OPTIONS.map((genre) => (
                                <SelectItem key={genre.value} value={genre.value.toString()}>
                                  {genre.value}. {genre.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter the price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map(status => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.value}
                                </SelectItem>

                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Developer Name</FormLabel>
                    <FormControl>
                      <Input
                        value={currentUser?.name ?? "Not signed in"}
                        readOnly
                      />
                    </FormControl>
                  </FormItem>
                </div>
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter game description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView >
  )
}

export default GamesCreate