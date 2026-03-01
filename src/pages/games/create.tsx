import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useBack } from "@refinedev/core"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { gameSchema } from "@/lib/schema";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UploadWidget from "@/components/upload-widget";
import { fi } from "zod/v4/locales";

const GamesCreate = () => {
  const back = useBack();
  const form = useForm({
    resolver: zodResolver(gameSchema),
    refineCoreProps: {
      resource: 'games',
      action: 'create',
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = form;

  const onSubmit = (values: z.infer<typeof gameSchema>) => {
    try {
      console.log("Creating game with values:", values);
    } catch (error) {
      console.log("Error creating game", error);
    }
  }
  const genres = [
    {
      id: 1,
      name: "Action-Based",
    },
    {
      id: 2,
      name: "Adventure-Based",
    },
    {
      id: 3,
      name: "Role-Playing",
    },
    {
      id: 4,
      name: "Simulation",
    },
    {
      id: 5,
      name: "Strategy",
    },
    {
      id: 6,
      name: "Sports",
    },
    {
      id: 7,
      name: "Puzzle",
    },
  ]

  const bannerPublicId = form.watch("bannerCldPubId");

  const setBannerImage = (file, field) => {
    if (file) {
      field.onChange(file.url);
      form.setValue('bannerCldPubId', file.publicId, {
        shouldValidate: true,
        shouldDirty: true,
      })
    } else {
      field.onChange("bannerCldPubId", '', {
        shouldValidate: true,
        shouldDirty: true,
      });
      form.setValue("bannerCldPubId", file.publicId, {
        shouldValidate: true,
        shouldDirty: true, 
      })
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
                          onChange={(file: any, field: any) => setBannerImage(file, field)}
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
                              {genres.map((genre) => (
                                <SelectItem key={genre.id} value={genre.id.toString()}>
                                  {genre.id}. ({genre.name})
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
                    name="developerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Developer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Developer Name" {...field} />
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
                          <Input placeholder="Enter the price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                </div>

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